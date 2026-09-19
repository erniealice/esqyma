#!/usr/bin/env python3
"""Opt-in CLI regression: unique loopback DB, temporary Git target, no app DB writes.

Supply P0_DB_HOST/PORT/USER/PASSWORD/SSLMODE through the process environment.
Requires the repository's pinned Atlas and PostgreSQL client tools.
"""
import hashlib,json,os,subprocess,tempfile,time
from pathlib import Path
root=Path(__file__).resolve().parents[4]
# Explicit test-only connection settings; never read an app/production env file.
values={}
for key in ('HOST','PORT','USER','PASSWORD','SSLMODE'):
 value=os.environ.get('P0_DB_'+key,'')
 if not value:
  raise SystemExit('initializer_cli_test: explicit P0_DB_'+key+' is required')
 values['DATABASE_POSTGRES_'+key]=value
if values['DATABASE_POSTGRES_HOST'] not in ('127.0.0.1','localhost','::1'):
 raise SystemExit('initializer_cli_test: refusing non-loopback host')
env=os.environ.copy()
for k in list(env):
 if k.startswith(('DATABASE_POSTGRES_','DB_INIT_','PG','GIT_')):env.pop(k)
env['GOWORK']=str(root/'go.work')
name='ichizen_init_'+str(time.time_ns())
pg=env|{'PGHOST':values['DATABASE_POSTGRES_HOST'],'PGPORT':values.get('DATABASE_POSTGRES_PORT','5432'),'PGUSER':values['DATABASE_POSTGRES_USER'],'PGPASSWORD':values['DATABASE_POSTGRES_PASSWORD'],'PGSSLMODE':values.get('DATABASE_POSTGRES_SSLMODE','disable')}
def query(sql):
 return subprocess.check_output(['psql','-X','-At','-v','ON_ERROR_STOP=1','-d','postgres','-c',sql],env=pg,text=True).strip()
assert query("SELECT inet_server_addr() <<= inet '127.0.0.0/8' OR inet_server_addr() = inet '::1'") == 't'
assert query("SELECT count(*) FROM pg_database WHERE datname='"+name+"'")=='0'
with tempfile.TemporaryDirectory(prefix='ichizen-init-cli-') as tmp, tempfile.TemporaryDirectory(prefix='ichizen-init-receipts-') as receipts:
 work=Path(tmp);(work/'packages').mkdir();(work/'go.work').write_text('fixture root marker\n')
 for package in ('esqyma','copya'):(work/'packages'/package).symlink_to(root/'packages'/package,target_is_directory=True)
 target=json.loads((root/'deploy/mmis/database/targets/local-education2.json').read_text())
 target['database']={'env_file':'runtime.env','name':name};target['scope']='disposable'
 target.pop('access',None);target.pop('upgrade',None);target['bundles']=[]
 path=work/'deploy/mmis/database/targets/local-education2.json';path.parent.mkdir(parents=True);path.write_text(json.dumps(target))
 registry={'format_version':1,'targets':[{'key':target['target_key'],'path':str(path.relative_to(work)),'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'scope':'disposable','environment':'ci','rollout_batch':0}]}
 (work/'deploy/database-fleet.json').write_text(json.dumps(registry))
 (work/'runtime.env').write_text('\n'.join(k+'='+v for k,v in values.items() if k.startswith('DATABASE_POSTGRES_'))+'\nDB_INIT_RECEIPT_DIR='+receipts+'\n')
 (work/'runtime.env').chmod(0o600)
 for args in (['init','-q'],['add','deploy'],['-c','user.name=Fixture','-c','user.email=fixture@example.invalid','-c','commit.gpgsign=false','-c','core.hooksPath=/dev/null','commit','-qm','fixture']):subprocess.run(['git','-C',str(work),*args],check=True,stdout=subprocess.DEVNULL)
 binary=work/'operator'
 subprocess.run(['go','build','-o',str(binary),'./packages/esqyma/cmd/schema-release'],cwd=root,env=env,check=True)
 args=[str(binary),'--target',target['target_key'],'--schema-release',target['schema_release']]
 def run(flags):
  p=subprocess.run(args+flags,cwd=work,env=env,text=True,capture_output=True)
  if p.returncode:
   # Runner errors contain no credential values, but sanitize known values defensively.
   error=p.stderr
   for key in ('DATABASE_POSTGRES_PASSWORD','DATABASE_POSTGRES_USER'):
    if values.get(key):error=error.replace(values[key],'<redacted>')
   raise RuntimeError(error[-1800:])
  return json.loads(p.stdout)
 try:
  run([]);assert query("SELECT count(*) FROM pg_database WHERE datname='"+name+"'")=='0'
  run(['--apply']);run(['--apply']);run(['--verify'])
  assert len(list(Path(receipts).glob('*.json')))==2
  print('Initializer CLI: PASS; absent plan is read-only, fresh apply, retry without seed secret, verify, two receipts')
 finally:
  # Name was proven absent before the harness; only its unique fixture is eligible.
  if query("SELECT count(*) FROM pg_database WHERE datname='"+name+"'")=='1':
   subprocess.run(['dropdb',name],env=pg,check=True)

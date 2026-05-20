import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { Location } from "../../../domain/entity/location/location_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/dashboard/location/dashboard.proto.
 */
export declare const file_service_dashboard_location_dashboard: GenFile;
/**
 * LocationStats are the four stat cards shown at the top of the location
 * dashboard: Total / Active / Regions / Areas Count.
 *
 * @generated from message service.dashboard.location.v1.LocationStats
 */
export type LocationStats = Message<"service.dashboard.location.v1.LocationStats"> & {
    /**
     * @generated from field: int64 total_locations = 1;
     */
    totalLocations: bigint;
    /**
     * @generated from field: int64 active_locations = 2;
     */
    activeLocations: bigint;
    /**
     * @generated from field: int64 regions_count = 3;
     */
    regionsCount: bigint;
    /**
     * @generated from field: int64 areas_count = 4;
     */
    areasCount: bigint;
};
/**
 * Describes the message service.dashboard.location.v1.LocationStats.
 * Use `create(LocationStatsSchema)` to create a new message.
 */
export declare const LocationStatsSchema: GenMessage<LocationStats>;
/**
 * LocationAreaCount is one row of the "top areas by location count" widget.
 *
 * @generated from message service.dashboard.location.v1.LocationAreaCount
 */
export type LocationAreaCount = Message<"service.dashboard.location.v1.LocationAreaCount"> & {
    /**
     * @generated from field: string location_area_id = 1;
     */
    locationAreaId: string;
    /**
     * @generated from field: string location_area_name = 2;
     */
    locationAreaName: string;
    /**
     * @generated from field: int64 location_count = 3;
     */
    locationCount: bigint;
};
/**
 * Describes the message service.dashboard.location.v1.LocationAreaCount.
 * Use `create(LocationAreaCountSchema)` to create a new message.
 */
export declare const LocationAreaCountSchema: GenMessage<LocationAreaCount>;
/**
 * GetLocationDashboardRequest is the workspace-scoped input for the
 * location dashboard use case.
 *
 * @generated from message service.dashboard.location.v1.GetLocationDashboardRequest
 */
export type GetLocationDashboardRequest = Message<"service.dashboard.location.v1.GetLocationDashboardRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * now_millis is unused by the current implementation but kept for
     * future time-range filtering. Zero means "use server time".
     *
     * @generated from field: optional int64 now_millis = 2;
     */
    nowMillis?: bigint;
};
/**
 * Describes the message service.dashboard.location.v1.GetLocationDashboardRequest.
 * Use `create(GetLocationDashboardRequestSchema)` to create a new message.
 */
export declare const GetLocationDashboardRequestSchema: GenMessage<GetLocationDashboardRequest>;
/**
 * GetLocationDashboardResponse is the projected aggregate set the
 * view layer renders into the dashboard page.
 *
 * @generated from message service.dashboard.location.v1.GetLocationDashboardResponse
 */
export type GetLocationDashboardResponse = Message<"service.dashboard.location.v1.GetLocationDashboardResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: service.dashboard.location.v1.LocationStats stats = 3;
     */
    stats?: LocationStats;
    /**
     * @generated from field: map<string, int64> locations_by_region = 4;
     */
    locationsByRegion: {
        [key: string]: bigint;
    };
    /**
     * @generated from field: repeated service.dashboard.location.v1.LocationAreaCount top_areas = 5;
     */
    topAreas: LocationAreaCount[];
    /**
     * @generated from field: repeated domain.entity.v1.Location recent_locations = 6;
     */
    recentLocations: Location[];
};
/**
 * Describes the message service.dashboard.location.v1.GetLocationDashboardResponse.
 * Use `create(GetLocationDashboardResponseSchema)` to create a new message.
 */
export declare const GetLocationDashboardResponseSchema: GenMessage<GetLocationDashboardResponse>;

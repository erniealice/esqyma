import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../domain/common/error_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/omni_search/omni_search.proto.
 */
export declare const file_service_omni_search_omni_search: GenFile;
/**
 * OmniSearchRequest is the palette query. query is the raw user text (the use
 * case enforces a >= 2-char minimum and a server-side length cap; the adapter
 * LIKE-escapes it). limit_per_category defaults to 5 and is server-capped at 10.
 * categories optionally narrows the search to a subset of the compile-time
 * registry; an empty list means "all registered categories"; an unknown key is
 * rejected with INVALID_ARGUMENT by the use case.
 *
 * @generated from message service.omni_search.v1.OmniSearchRequest
 */
export type OmniSearchRequest = Message<"service.omni_search.v1.OmniSearchRequest"> & {
    /**
     * @generated from field: string query = 1;
     */
    query: string;
    /**
     * @generated from field: optional int32 limit_per_category = 2;
     */
    limitPerCategory?: number;
    /**
     * @generated from field: repeated string categories = 3;
     */
    categories: string[];
};
/**
 * Describes the message service.omni_search.v1.OmniSearchRequest.
 * Use `create(OmniSearchRequestSchema)` to create a new message.
 */
export declare const OmniSearchRequestSchema: GenMessage<OmniSearchRequest>;
/**
 * OmniSearchResult is one row = one entity match. id is the entity's opaque id
 * (the view builds the detail href from it via the Layer-3 route map); label is
 * the resolved display string; sublabel is an optional secondary line
 * (internal_id, client label, product kind, ...).
 *
 * @generated from message service.omni_search.v1.OmniSearchResult
 */
export type OmniSearchResult = Message<"service.omni_search.v1.OmniSearchResult"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string label = 2;
     */
    label: string;
    /**
     * @generated from field: optional string sublabel = 3;
     */
    sublabel?: string;
};
/**
 * Describes the message service.omni_search.v1.OmniSearchResult.
 * Use `create(OmniSearchResultSchema)` to create a new message.
 */
export declare const OmniSearchResultSchema: GenMessage<OmniSearchResult>;
/**
 * OmniSearchCategoryResults groups the matches for one category. category is the
 * registry key (client/subscription/...); the view maps it to a tier-skinned
 * section header via lyngua and to a detail route key via the route map.
 *
 * @generated from message service.omni_search.v1.OmniSearchCategoryResults
 */
export type OmniSearchCategoryResults = Message<"service.omni_search.v1.OmniSearchCategoryResults"> & {
    /**
     * @generated from field: string category = 1;
     */
    category: string;
    /**
     * @generated from field: repeated service.omni_search.v1.OmniSearchResult results = 2;
     */
    results: OmniSearchResult[];
};
/**
 * Describes the message service.omni_search.v1.OmniSearchCategoryResults.
 * Use `create(OmniSearchCategoryResultsSchema)` to create a new message.
 */
export declare const OmniSearchCategoryResultsSchema: GenMessage<OmniSearchCategoryResults>;
/**
 * OmniSearchResponse carries the per-category result groups in registry order.
 * Denied categories are ABSENT (never enumerated as empty), so the response
 * never leaks which categories a principal cannot see.
 *
 * @generated from message service.omni_search.v1.OmniSearchResponse
 */
export type OmniSearchResponse = Message<"service.omni_search.v1.OmniSearchResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: repeated service.omni_search.v1.OmniSearchCategoryResults categories = 3;
     */
    categories: OmniSearchCategoryResults[];
};
/**
 * Describes the message service.omni_search.v1.OmniSearchResponse.
 * Use `create(OmniSearchResponseSchema)` to create a new message.
 */
export declare const OmniSearchResponseSchema: GenMessage<OmniSearchResponse>;
/**
 * @generated from service service.omni_search.v1.OmniSearchService
 */
export declare const OmniSearchService: GenService<{
    /**
     * @generated from rpc service.omni_search.v1.OmniSearchService.SearchEntities
     */
    searchEntities: {
        methodKind: "unary";
        input: typeof OmniSearchRequestSchema;
        output: typeof OmniSearchResponseSchema;
    };
}>;

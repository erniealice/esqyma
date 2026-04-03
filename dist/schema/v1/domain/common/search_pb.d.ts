import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/common/search.proto.
 */
export declare const file_domain_common_search: GenFile;
/**
 * Search request configuration
 *
 * @generated from message domain.common.v1.SearchRequest
 */
export type SearchRequest = Message<"domain.common.v1.SearchRequest"> & {
    /**
     * Search query string
     *
     * @generated from field: string query = 1;
     */
    query: string;
    /**
     * @generated from field: domain.common.v1.SearchOptions options = 2;
     */
    options?: SearchOptions;
};
/**
 * Describes the message domain.common.v1.SearchRequest.
 * Use `create(SearchRequestSchema)` to create a new message.
 */
export declare const SearchRequestSchema: GenMessage<SearchRequest>;
/**
 * Search configuration options
 *
 * @generated from message domain.common.v1.SearchOptions
 */
export type SearchOptions = Message<"domain.common.v1.SearchOptions"> & {
    /**
     * Fields to search in
     *
     * @generated from field: repeated string search_fields = 1;
     */
    searchFields: string[];
    /**
     * Weight per field
     *
     * @generated from field: map<string, double> field_weights = 2;
     */
    fieldWeights: {
        [key: string]: number;
    };
    /**
     * Enable fuzzy matching
     *
     * @generated from field: bool enable_fuzzy = 3;
     */
    enableFuzzy: boolean;
    /**
     * Enable result highlighting
     *
     * @generated from field: bool enable_highlighting = 4;
     */
    enableHighlighting: boolean;
    /**
     * Maximum number of results
     *
     * @generated from field: int32 max_results = 5;
     */
    maxResults: number;
};
/**
 * Describes the message domain.common.v1.SearchOptions.
 * Use `create(SearchOptionsSchema)` to create a new message.
 */
export declare const SearchOptionsSchema: GenMessage<SearchOptions>;
/**
 * Search result metadata
 *
 * @generated from message domain.common.v1.SearchResult
 */
export type SearchResult = Message<"domain.common.v1.SearchResult"> & {
    /**
     * Relevance score
     *
     * @generated from field: double score = 1;
     */
    score: number;
    /**
     * Highlighted text per field
     *
     * @generated from field: map<string, string> highlights = 2;
     */
    highlights: {
        [key: string]: string;
    };
};
/**
 * Describes the message domain.common.v1.SearchResult.
 * Use `create(SearchResultSchema)` to create a new message.
 */
export declare const SearchResultSchema: GenMessage<SearchResult>;
/**
 * Search metrics for analytics
 *
 * @generated from message domain.common.v1.SearchMetrics
 */
export type SearchMetrics = Message<"domain.common.v1.SearchMetrics"> & {
    /**
     * @generated from field: int32 total_results = 1;
     */
    totalResults: number;
    /**
     * @generated from field: double query_time_ms = 2;
     */
    queryTimeMs: number;
    /**
     * @generated from field: repeated string top_terms = 3;
     */
    topTerms: string[];
    /**
     * @generated from field: map<string, int32> field_match_counts = 4;
     */
    fieldMatchCounts: {
        [key: string]: number;
    };
};
/**
 * Describes the message domain.common.v1.SearchMetrics.
 * Use `create(SearchMetricsSchema)` to create a new message.
 */
export declare const SearchMetricsSchema: GenMessage<SearchMetrics>;

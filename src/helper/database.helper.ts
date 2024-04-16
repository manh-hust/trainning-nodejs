/**
 * Add sorting condition to the SQL query.
 * @param query The SQL query to which the sorting condition will be added.
 * @param field The field by which to sort.
 * @param value The sorting order (ASC or DESC).
 * @returns The updated SQL query with the sorting condition.
 */
export function addSortQuery(query: string, field: string, value: string): string {
  return query + ` ORDER BY ${field} ${value}`;
}

/**
 * Add filtering condition to the SQL query.
 * @param query The SQL query to which the filtering condition will be added.
 * @param field The field by which to filter.
 * @param value The value to filter by.
 * @returns The updated SQL query with the filtering condition.
 */
export function addFilterQuery(query: string, field: string, value: string): string {
  return query + ` WHERE ${field} = ${value}`;
}

/**
 * Add filtering condition by name to the SQL query.
 * @param query The SQL query to which the filtering condition will be added.
 * @param value The value to filter by name.
 * @returns The updated SQL query with the filtering condition by name.
 */
export function addFilterLikeQuery(query: string, field: string, value: string): string {
  return query + ` WHERE ${field} LIKE '%${value}%'`;
}

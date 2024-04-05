/**
 * Common query data function
 */
export class DatabaseHelper {
  /**
   * Add sorting condition to the SQL query.
   * @param query The SQL query to which the sorting condition will be added.
   * @param field The field by which to sort.
   * @param value The sorting order (ASC or DESC).
   * @returns The updated SQL query with the sorting condition.
   */
  public static addSortQuery(query: string, field: string, value: string): string {
    return query + ` ORDER BY ${field} ${value}`;
  }

  /**
   * Add filtering condition to the SQL query.
   * @param query The SQL query to which the filtering condition will be added.
   * @param field The field by which to filter.
   * @param value The value to filter by.
   * @returns The updated SQL query with the filtering condition.
   */
  public static addFilterQuery(query: string, field: string, value: string): string {
    return query + ` WHERE ${field} = ${value}`;
  }

  /**
   * Add filtering condition by name to the SQL query.
   * @param query The SQL query to which the filtering condition will be added.
   * @param value The value to filter by name.
   * @returns The updated SQL query with the filtering condition by name.
   */
  public static addFilterLikeQuery(query: string, field: string, value: string): string {
    return query + ` WHERE ${field} LIKE '%${value}%'`;
  }
}

import { addFilterLikeQuery, addFilterQuery, addSortQuery } from '@src/helper/database.helper';

// Test cases for normal cases
describe('Normal cases', () => {
  test('[addSortQuery-1]. Should return query has sort added if add sort field and value', () => {
    // initialize test data
    const baseQuery: string = 'SELECT * FROM todo';
    const field: string = 'created_at';
    const value: string = 'DESC';
    const expectData = `${baseQuery} ORDER BY ${field} ${value}`;
    expect(addSortQuery(baseQuery, field, value)).toMatch(expectData);
  });

  test('[addFilterQuery-1]. Should return query has filter added if add filter field and value', () => {
    // initialize test data
    const baseQuery: string = 'SELECT * FROM todo';
    const field: string = 'status';
    const value: string = '0';
    const expectData = `${baseQuery} WHERE ${field} = ${value}`;
    expect(addFilterQuery(baseQuery, field, value)).toMatch(expectData);
  });

  test('[addFilterLikeQuery-1]. Should return query has filter like query added if add like query field and value', () => {
    // initialize test data
    const baseQuery: string = 'SELECT * FROM todo';
    const field: string = 'title';
    const value = 'Home';
    const expectData = `${baseQuery} WHERE ${field} LIKE '%${value}%'`;
    expect(addFilterLikeQuery(baseQuery, field, value)).toMatch(expectData);
  });
});

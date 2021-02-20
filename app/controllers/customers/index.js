import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  sortProperty: 'fullName',
  SearchProperty: 'fullName',
  SearchString: '',

  customersSortProps: computed('sortProperty', function () {
    return [this.sortProperty];
  }),

  customersSearchProperty: computed('SearchProperty', function () {
    return [this.SearchProperty];
  }),

  customersSearchString: computed('SearchString', function () {
    return [this.SearchString];
  }),

  sortedAndFilteredCustomers: computed('sortProperty', 'SearchProperty','SearchString', function () {
    let filteredList = this.get('model').filter(x => x[this.SearchProperty].toLowerCase().includes(this.SearchString.toLowerCase())).sort((a, b) => {
      if (a[this.customersSortProps] > b[this.customersSortProps]) {
        return 1;
      } else if (a[this.customersSortProps] < b[this.customersSortProps]) {
        return -1;
      }
      return 0;
    });
    return filteredList;
  })
});

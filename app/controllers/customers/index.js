import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  sortProperty: 'lastName',
  SearchProperty: 'lastName',
  SearchString: '',

  customersSortProps: computed('sortProperty', function() {
    return [this.sortProperty];
  }),

  customersSearchProperty: computed('SearchProperty', function() {
    return [this.SearchProperty];
  }),

  customersSearchString: computed('SearchString', function() {
    return [this.SearchString];
  }),

  sortedCustomers: sort('model', 'customersSortProps'),

  sortedAndFilteredCustomers: computed(function () {
    let filteredList = this.get('model').filter(x => x[this.SearchProperty].toString().includes(this.SearchString)).sort((a, b) => {
      if (a[this.customersSortProps] > b[this.customersSortProps]) {
        return 1;
      } else if (a[this.customersSortProps] < b[this.customersSortProps]) {
        return -1;
      }
      return 0;
    });
    return filteredList;
  }),
});

import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    customersbudget: computed(function () {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          });
        return formatter.format(this.get('model').map(x => x.budget).reduce((x, y) => x + y));
    }),
    customersCount: computed(function () {
        return this.get('model.length');
    }),
    sortedCustomers: computed(function () {
        let filteredList = this.get('model').toArray().sort((a, b) => {
            if (a['budget'] > b['budget']) {
              return -1;
            } else if (a['budget'] < b['budget']) {
              return 1;
            }
            return 0;
          });
        return filteredList;
    }),
});
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, observer } from '@ember/object';
import Table from 'ember-light-table';

export default Component.extend({
  router: service(),
  classNames: ['customers-table', 'table-responsive'],
  model: null,
  table: null,
  Top5: false,

  Top5columns: computed(function () {
    return [
      {
        label: 'Name',
        valuePath: 'fullName',
        sortable: false
      },
      {
        label: 'Company',
        valuePath: 'company',
        sortable: false,
        breakpoints: ['desktop', 'jumbo']
      },
      {
        label: 'Budget',
        valuePath: 'budget',
        sortable: false,
        breakpoints: ['jumbo']
      }
    ]
  }),

  columns: computed(function () {
    return [
      {
        label: 'First Name',
        valuePath: 'firstName',
        sortable: false
      },
      {
        label: 'Last Name',
        valuePath: 'lastName',
        sortable: false
      },
      {
        label: 'Email',
        valuePath: 'emailAddress',
        width: '250px',
        sortable: false,
        breakpoints: ['tablet', 'desktop', 'jumbo']
      },
      {
        label: 'Company',
        valuePath: 'company',
        sortable: false,
        breakpoints: ['desktop', 'jumbo']
      },
      {
        label: 'Project',
        valuePath: 'project',
        sortable: false,
        breakpoints: ['desktop', 'jumbo']
      },
      {
        label: 'Budget',
        valuePath: 'budget',
        sortable: false,
        breakpoints: ['jumbo']
      }
    ]
  }),

  // eslint-disable-next-line ember/no-observers
  onModelChange: observer('model', function () {
    if (this.table) {
      this.table.setRowsSynced(this.model);
    }
  }),

  init() {
    this._super(...arguments);
    let table;
    if(this.Top5) {
      table = new Table(this.Top5columns, this.model.slice(0, 5), { enableSync: true });
    }
    else {
      table = new Table(this.columns, this.model, { enableSync: true });
    } 
    this.set('table', table);
  },

  actions: {
    onRowClick(row) {
      this.router.transitionTo('customers.customer', row.get('id'));
    },
  }
});

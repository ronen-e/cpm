import Immutable, { Record as newRecord, List as newList} from 'immutable';
import { Transaction } from './transaction';
import { DEFAULT_AVATAR } from '../services/constants';

var CustomerFields = newRecord({
    id: undefined,
    name: undefined,
    age: undefined,
    gender: undefined,
    imageId: DEFAULT_AVATAR,
    transactions: newList()
});

export class Customer extends CustomerFields {
    parse(data) {
        if (!data) {
            return this;
        }

        var fields = {};

        [
            'id', 'name', 'age', 'gender', 'imageId'
        ].forEach(field =>
            fields[field] = (data[field] !== undefined) ? data[field] : this.get(field)
        );

        if (data.hasOwnProperty('transactions')) {
            fields.transactions = newList(data.transactions.map(item => new Transaction(item)));
        } else {
            fields.transactions = this.transactions;
        }

        var newCustomer = new Customer(fields);
        return Immutable.is(this, newCustomer) ? this : newCustomer;
    }

    getAge() {
        var now = new Date();
        var then = new Date(this.age);
        var age = now.getFullYear() - then.getFullYear();
        var m = now.getMonth() - then.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < then.getDate())) {
            age--;
        }
        return age;
    }

    getBirthdate() {
        return new Date(this.age).toDateString();
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            gender: this.gender,
            imageId: this.imageId,
            transactions: this.transactions.toArray()
        };
    }

    static fromJSON(json) {
        return new Customer().parse(json);
    }

}

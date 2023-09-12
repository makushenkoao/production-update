import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { ValidateProfileError } from '../../consts/consts';
import { validateProfile } from './validateProfile';

const data = {
    firstname: 'Anton',
    lastname: 'Makushenko',
    age: 17,
    currency: Currency.UAH,
    country: Country.Ukraine,
    city: 'Cherkasy',
    username: 'admin',
};

describe('validate profile data', () => {
    test('success', async () => {
        const result = validateProfile(data);
        expect(result).toEqual([]);
    });

    test('incorrect firstname and lastname', async () => {
        const result = validateProfile({
            ...data,
            firstname: '',
            lastname: '',
        });
        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });

    test('incorrect age', async () => {
        const result = validateProfile({ ...data, age: undefined });
        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });

    test('incorrect all', async () => {
        const result = validateProfile({});
        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });
});

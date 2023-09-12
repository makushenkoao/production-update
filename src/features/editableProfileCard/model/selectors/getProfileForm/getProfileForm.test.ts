import { StateSchema } from '@/app/providers/StoreProvider';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { getProfileForm } from './getProfileForm';

describe('Selector get profile form', () => {
    test('should return form', () => {
        const form = {
            firstname: 'Anton',
            lastname: 'Makushenko',
            age: 17,
            currency: Currency.UAH,
            country: Country.Ukraine,
            city: 'Cherkasy',
            username: 'admin',
        };
        const state: DeepPartial<StateSchema> = {
            profile: {
                form,
            },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(form);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});

import { describe, expect, test } from 'vitest';
import { Manager, ManagerElement } from '.';


/** Creates dummy ManagerElement. */
function dum(id?: string): ManagerElement
{
    return new ManagerElement(
        document.createElement('div'),
        document.createElement('div'),
        {},
        id,
    );
}


describe('Manager object initialisation', () =>
{
    test('should correctly initialise without any initial elements', () =>
    {
        const m = new Manager();

        expect(m).toBeInstanceOf(Manager);
        expect(Array.isArray(m.elements)).toBe(true);
        expect(m.elements).toHaveLength(0);
    });

    test('should correctly initialise with some initial elements', () =>
    {
        const m = new Manager(dum(), dum());
        expect(m.elements).toHaveLength(2);
    });
});


describe('Manager.find', () =>
{
    test('should not find any elements', () =>
    {
        const m = new Manager();
        expect(m.find('1234')).toBeUndefined();
    });

    test('should find', () =>
    {
        const ID = '123';

        const m = new Manager(dum(ID));
        const e = m.find(ID);

        expect(e).toBeDefined();
        expect(e!.id).toBe(ID);
    });
});


describe('Manager.add', () =>
{
    test('should correctly add element to the collection', () =>
    {
        const m = new Manager();
        m.add(dum());
        expect(m.elements).toHaveLength(1);
    });
});


describe('Manager.remove', () =>
{
    test('should correctly remove element from the collection', () =>
    {
        const ID = '123';
        const INIT_ELEMS = [ dum(ID), dum() ];

        const m = new Manager(...INIT_ELEMS);

        expect(m.find(ID)).toBeDefined();

        m.remove(ID);
        expect(m.elements).toHaveLength(INIT_ELEMS.length - 1);

        expect(m.find(ID)).toBeUndefined();
    });
});


describe('Manager.removeAll', () =>
{
    test('should correctly remove all elements from the collection', () =>
    {
        const m = new Manager(dum(), dum(), dum(), dum());

        m.removeAll();
        expect(m.elements).toHaveLength(0);
    });
});

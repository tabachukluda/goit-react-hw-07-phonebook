import { createSelector } from '@reduxjs/toolkit';
const selectContacts = (state) => state.contacts.items;
const selectFilter = (state) => state.contacts.filter;
export const selectVisibleContacts = createSelector(
    [selectContacts, selectFilter],
    (contacts, filter) => {
    return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    }
);


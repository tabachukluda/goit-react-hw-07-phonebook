import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://64f4c5f2932537f4051aafd6.mockapi.io/contacts'; 

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
    try {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    const data = await response.json();
    return data;
    } catch (error) {
    throw new Error('Failed to fetch contacts');
    }
});

export const addContact = createAsyncThunk('contacts/addContact', async (contactData) => {
    try {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
    });
    if (!response.ok) {
        throw new Error('Failed to add contact');
    }
    const data = await response.json();
    return data;
    } catch (error) {
    throw new Error('Failed to add contact');
    }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
    try {
    const response = await fetch(`${API_URL}/${contactId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
    } catch (error) {
    throw new Error('Failed to delete contact');
    }
});

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '',
    },
    reducers: {
    setFilter: (state, action) => {
        state.filter = action.payload;
    },
    },
    extraReducers: (builder) => {
    builder
        .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        })
        .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        })
        .addCase(fetchContacts.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Failed to fetch contacts';
        })
        .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        })
        .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.meta.arg);
        });
    },
});

export const { setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
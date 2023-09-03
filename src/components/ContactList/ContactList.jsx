import { useDispatch, useSelector } from 'react-redux';
import css from './ContactList.module.css';
import { deleteContact } from 'redux/contactsslice';

export const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contacts.items);

    if (contacts.length === 0) {
    return <p className={css.noContacts}>No contacts to display.</p>;
    }

    return (
    <div className={css.wraperContactList}>
        <ul className={css.contactList}>
        {contacts.map((contact) => (
            <li key={contact.id} className={css.contactListItem}>
            {contact.name}: {contact.number}
            <button
                type="button"
                className={css.contactListItemBtn}
                onClick={() => dispatch(deleteContact(contact.id))}
            >
                Delete
            </button>
            </li>
        ))}
        </ul>
    </div>
    );
};

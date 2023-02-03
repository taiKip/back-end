import Contact, { ContactDocument } from '../models/Contact'
import { NotFoundError } from '../helpers/apiError'

const create = async (Contact: ContactDocument): Promise<ContactDocument> => {
  return Contact.save()
}

const findById = async (contactId: string): Promise<ContactDocument> => {
  const foundContact = await Contact.findById(contactId)

  if (!foundContact) {
    throw new NotFoundError(`School ${contactId} not found`)
  }

  return foundContact
}

const findAll = async (): Promise<ContactDocument[]> => {
  return Contact.find()
}

const update = async (
  contactId: string,
  update: Partial<ContactDocument>
): Promise<ContactDocument | null> => {
  const foundContact = await Contact.findByIdAndUpdate(contactId, update, {
    new: true,
  })

  if (!foundContact) {
    throw new NotFoundError(`Contact ${contactId} not found`)
  }

  return foundContact
}

const deleteContact = async (contactId: string): Promise<ContactDocument | null> => {
  const foundContact = Contact.findByIdAndDelete(contactId)

  if (!foundContact) {
    throw new NotFoundError(`Contact ${contactId} not found`)
  }

  return foundContact
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteContact,
}

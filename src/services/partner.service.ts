import Partner, { PartnerDocument } from '../models/Partner'
import { NotFoundError } from '../helpers/apiError'

const create = async (partner: PartnerDocument): Promise<PartnerDocument> => {
  return partner.save()
}

const findById = async (partnerId: string): Promise<PartnerDocument> => {
  const foundPartner = await Partner.findById(partnerId)

  if (!foundPartner) {
    throw new NotFoundError(`Partner ${partnerId} not found`)
  }

  return foundPartner
}

const findAll = async (): Promise<PartnerDocument[]> => {
  return Partner.find()
}

const update = async (
  partnerId: string,
  update: Partial<PartnerDocument>
): Promise<PartnerDocument | null> => {
  const foundPartner = await Partner.findByIdAndUpdate(partnerId, update, {
    new: true,
  })

  if (!foundPartner) {
    throw new NotFoundError(`Course ${partnerId} not found`)
  }

  return foundPartner
}

const deletePartner = async (
  partnerId: string
): Promise<PartnerDocument | null> => {
  const foundPartner = Partner.findByIdAndDelete(partnerId)

  if (!foundPartner) {
    throw new NotFoundError(`Course ${partnerId} not found`)
  }

  return foundPartner
}

export default {
  create,
  findById,
  findAll,
  update,
  deletePartner,
}

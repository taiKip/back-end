import Service, { ServiceDocument } from '../models/Service'
import { NotFoundError } from '../helpers/apiError'

const create = async (service: ServiceDocument): Promise<ServiceDocument> => {
  return service.save()
}

const findById = async (serviceId: string): Promise<ServiceDocument> => {
  const foundService = await Service.findById(serviceId)

  if (!foundService) {
    throw new NotFoundError(`service ${serviceId} not found`)
  }

  return foundService
}

const findAll = async (): Promise<ServiceDocument[]> => {
  return Service.find()
}

const update = async (
  serviceId: string,
  update: Partial<ServiceDocument>
): Promise<ServiceDocument | null> => {
  const foundService = await Service.findByIdAndUpdate(serviceId, update, {
    new: true,
  })

  if (!foundService) {
    throw new NotFoundError(`School ${serviceId} not found`)
  }

  return foundService
}

const deleteService = async (serviceId: string): Promise<ServiceDocument | null> => {
  const foundService = Service.findByIdAndDelete(serviceId)

  if (!foundService) {
    throw new NotFoundError(`School ${serviceId} not found`)
  }

  return foundService
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteService,
}

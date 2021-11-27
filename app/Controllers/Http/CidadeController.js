'use strict'

const Database = use('Database')

class CidadeController {
  async index({
    request,
    response,
    params
  }) {
    const cidade = await Database.select('*').from('cidade')
    return response.status(200).json({
      cidades: cidade
    })
  }
}

module.exports = CidadeController

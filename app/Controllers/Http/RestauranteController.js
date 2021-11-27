'use strict'
const Database = use('Database')

class RestauranteController {
  async index({
    request,
    response,
    params
  }) {
    if (!isNaN(params.id)) {
      const restaurantes = await Database
        .select(
          'restaurante.NOME',
          'endereco.RUA',
          'cidade.ESTADO',
          'restaurante.ESPECIALIDADE',
          'restaurante.PRECO_MEDIO'
        )
        .from('restaurante')
        .innerJoin('endereco', 'restaurante.ID_ENDERECO', 'endereco.CODIGO_ENDERECO')
        .innerJoin('cidade', 'cidade.CODIGO_CIDADE', 'endereco.ID_CIDADE')
        .where('cidade.CODIGO_CIDADE', params.id)
      if (restaurantes.length) {
        return response.status(200).json({
          restaurantes: restaurantes
        })
      } else {
        return response.status(404).json({
          mensagem: 'Não encontrado'
        })
      }
    } else {
      return response.status(406).json({
        mensagem: 'Valor inválido'
      })
    }
  }

}

module.exports = RestauranteController

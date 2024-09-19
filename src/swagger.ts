const version = 'v1';
const url = 'http://localhost:3000';

const swaggerTemplate = {
  openapi: '3.0.3',
  info: {
    title: 'Adm System',
    description: 'Adm system documentation with all spec',
    version: '1.0.0',
    contact: {
      name: 'Rafael Horauti',
      email: 'rafael_h44@hotmail.com',
    },
  },
  servers: [
    {
      url: `${url}/${version}`,
    },
  ],
  paths: {
    '/company': {
      get: {
        summary: 'Get companies list',
        description: 'Returns all companies from database',
        parameters: [
          {
            name: 'companyType',
            in: 'path',
            required: true,
            description: 'returns company type that defines if it is a customer, supplier, etc',
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          200: {
            description: 'Request succeded. Returns the requested data',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Company',
                  },
                },
              },
            },
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Insert new data to database',
        description: 'Returns data inserted',
        requestBody: {
          description: 'data from body request',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                items: {
                  $ref: '#/components/schemas/Company',
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Request succeded. Returns the requested data',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse',
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Company: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          date: {
            type: 'string',
            format: 'date-time',
          },
          type: {
            type: 'number',
          },
          nickname: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          cnpj: {
            type: 'string',
          },
          ie: {
            type: 'string',
          },
          im: {
            type: 'string',
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          status: {
            type: 'boolean',
          },
          msg: {
            type: 'string',
          },
        },
      },
      SuccessResponse: {
        type: 'object',
        properties: {
          status: {
            type: 'boolean',
          },
          msg: {
            type: 'string',
          },
          data: {
            type: 'object',
          },
        },
      },
    },
  },
};

export { swaggerTemplate };

const OpenAPIBackend = require('openapi-backend').default;
const express = require('express');
const jobController = require('../../controllers/jobs');
const userController = require('../../controllers/users');
const passport = require('passport');

// define api
 const api = new OpenAPIBackend({
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'JOB API',
            version: '1.0.0',
        },
        paths: {
            '/api/job': {
                get: {
                    operationId: 'getAllJobs',
                    responses: {
                        200: { description: 'ok' },
                    },
                },
            },
            '/api/job/{jobId}': {
                get: {
                    operationId: 'getJobsById',
                    responses: {
                        200: { description: 'ok' },
                    },
                    parameters: [
                        {
                            name: 'jobId',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                },
                put: {
                    operationId: 'updateJobsById',
                    responses: {
                        200: {
                            description: "ok",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: 'string'
                                        // $ref: "#/components/schemas/Job"
                                    }
                                }
                            }
                        }
                    },
                    parameters: [
                        {
                            name: 'jobId',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'object',
                            },
                        },
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: 'string'
                                    // $ref: "#/components/schemas/Job"
                                }
                            }
                        },
                        required: true
                    },
                },
            },
            '/api/user/register': {
                post: {
                    operationId: 'createUserAccount',
                    responses: {
                        200: {
                            description: "ok",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: 'string'
                                        // $ref: "#/components/schemas/Job"
                                    }
                                }
                            }
                        }
                    },
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: 'string'
                                    // $ref: "#/components/schemas/Job"
                                }
                            }
                        },
                        required: true
                    },
                },
            },
            '/api/user/login': {
                post: {
                    operationId: 'loginUser',
                    responses: {
                        200: {
                            description: "ok",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: 'string'
                                        // $ref: "#/components/schemas/Job"
                                    }
                                }
                            }
                        }
                    },
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: 'string'
                                    // $ref: "#/components/schemas/Job"
                                }
                            }
                        },
                        required: true
                    },
                },
            },
            '/api/user/profile': {
                get: {
                    operationId: 'profileUser',
                    responses: {
                        200: {
                            description: "ok",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: 'string'
                                        // $ref: "#/components/schemas/Job"
                                    }
                                }
                            }
                        }
                    }
                },
            },
        },
        // components: {
        //     schemas: {
        //         Job: {
        //             type: "object",
        //             properties: {
        //                 jobTitle: {
        //                     type: "string",
        //                     required: true
        //                 },
        //                 jobType: {
        //                     type: "string",
        //                     required: true
        //                 },
        //                 level: {
        //                     type: "string",
        //                     required: false
        //                 },
        //                 jobDesc: {
        //                     type: "string",
        //                     required: true
        //                 },
        //                 applicationTarget: {
        //                     type: "string",
        //                     required: true
        //                 },
        //                 emailAddress: {
        //                     type: "string",
        //                     required: true
        //                 },
        //                 companyName: {
        //                     type: "string",
        //                     required: true
        //                 },
        //                 companyImageUrl: {
        //                     type: "string",
        //                     required: false
        //                 },
        //                 skills: {
        //                     type: "array",
        //                     required: true
        //                 },
        //                 currency: {
        //                     type: "string",
        //                     required: false
        //                 },
        //                 minSalary: {
        //                     type: "number",
        //                     required: false
        //                 },
        //                 maxSalary: {
        //                     type: "number",
        //                     required: false
        //                 },
        //                 location: {
        //                     type: "string",
        //                     required: true
        //                 },
        //                 date: {
        //                     type: "string",
        //                     format: "date-time",
        //                     readOnly: true
        //                 }
        //             }
        //         }
        //     }
        // }
    },
    handlers: {
        getAllJobs: jobController.getAll,
        getJobsById: jobController.getById,
        updateJobsById: jobController.update,
        createUserAccount: userController.register,
        loginUser: userController.login,
        profileUser: userController.profile
    }
});

api.register({
    notFound: async (c, req, res) => res.status(404).json({ err: 'not found' }),
    unauthorizedHandler: async (c, req, res) => res.status(401).json({ err: 'unauthorized' }),
});

module.exports = api;
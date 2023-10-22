import { Elysia, t } from 'elysia';
import Kirby, { IKirby } from '../entities/kirby.schema';

export const kirbysController = (app: Elysia) =>
    app.group('/kirbys', (app: Elysia) =>
        app
            .post('/', async (handler: Elysia.Handler) => {
                try {

                    const newKirby = new Kirby();
                    newKirby.name = handler.body.name;
                    newKirby.image = handler.body.image;

                    const savedKirby = await newKirby.save();

                    handler.set.status = 201;

                    return newKirby;
                } catch (e: any) {
                    // If unique mongoose constraint (for name or image) is violated
                    if (e.name === 'MongoServerError' && e.code === 11000) {
                        handler.set.status = 422;
                        return {
                            message: 'Resource already exists!',
                            status: 422,
                        };
                    }

                    handler.set.status = 500;
                    return {
                        message: 'Unable to save entry to the database!',
                        status: 500,
                    };
                }
            }, {
                detail: {
                    summary: 'Add one kirby',
                    tags: ['Crud Kirby'],
                    description: "Add resources for one new kirby in database",
                    responses: {
                        "200": {
                            description: "Add resources for one new kirby",
                        }
                    }
                }
            })
            .get('/', async ({ set }: Elysia.Set) => {
                try {
                    const kirbys = await Kirby.find({});
                    return kirbys;
                } catch (e: unknown) {
                    set.status = 500;
                    return {
                        message: 'Unable to retrieve items from the database!',
                        status: 500,
                    };
                }
            }, {
                detail: {
                    summary: 'Get all kirbys',
                    tags: ['Crud Kirby'],
                    description: "Shows all kirbys in database",
                    responses: {
                        "200": {
                            description: "List of kirbys",
                        }
                    }
                }
            })

            .get('/:id', async (handler: Elysia.Handler) => {
                try {
                    const { id } = handler.params;

                    const existingKirby = await Kirby.findById(id);

                    if (!existingKirby) {
                        handler.set.status = 404;
                        return {
                            message: 'Requested resource was not found!',
                            status: 404,
                        };
                    }

                    return existingKirby;
                } catch (e: unknown) {
                    handler.set.status = 500;
                    return {
                        message: 'Unable to retrieve the resource!',
                        status: 500,
                    };
                }
            }, {
                detail: {
                    summary: 'Get one kirby',
                    tags: ['Crud Kirby'],
                    description: "Shows one specific kirby in database",
                    responses: {
                        "200": {
                            description: "Information of one kirby",
                        }
                    }
                }
            })

            .patch('/:id', async (handler: Elysia.Handler) => {
                try {
                    const { id } = handler.params;

                    const changes: Partial<IKirby> = handler.body;

                    const updatedKirby = await Kirby.findOneAndUpdate(
                        { _id: id },
                        { $set: { ...changes } },
                        { new: true }
                    );

                    if (!updatedKirby) {
                        handler.set.status = 404;
                        return {
                            message: `Kirby with id: ${id} was not found.`,
                            status: 404,
                        };
                    }

                    return updatedKirby;
                } catch (e: unknown) {
                    handler.set.status = 500;
                    return {
                        message: 'Unable to update resource!',
                        status: 500,
                    };
                }
            }, {
                detail: {
                    summary: 'Modify one kirby',
                    tags: ['Crud Kirby'],
                    description: "Update one specific kirby in database",
                    responses: {
                        "200": {
                            description: "Change resources of one specific kirby",
                        }
                    }
                }
            })

            .delete('/:id', async (handler: Elysia.Handler) => {
                try {
                    const { id } = handler.params;

                    const existingKirby = await Kirby.findById(id);

                    if (!existingKirby) {
                        handler.set.status = 404;
                        return {
                            message: `Kirby with id: ${id} was not found.`,
                            status: 404,
                        };
                    }

                    await Kirby.findOneAndRemove({ _id: id });

                    return {
                        message: `Resource deleted successfully!`,
                        status: 200,
                    };
                } catch (e: unknown) {
                    handler.set.status = 500;
                    return {
                        message: 'Unable to delete resource!',
                        status: 500,
                    };
                }
            },{
                detail: {
                    summary: 'Delete one kirby',
                    tags: ['Crud Kirby'],
                    description: "Remove one specific kirby in database",
                    responses: {
                        "200": {
                            description: "Delete all the resources of one specific kirby",
                        }
                    }
                }
            })
    );
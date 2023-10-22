import { Elysia, t } from 'elysia';
import User, { IUser } from '../entities/user.schema';

export const usersController = (app: Elysia) =>
    app.group('/users', (app: Elysia) =>
        app
            .post('/', async (handler: Elysia.Handler) => {
                try {

                    const newUser = new User();
                    newUser.username = handler.body.username;
                    newUser.email = handler.body.email;
                    newUser.password = handler.body.password;

                    const savedUser = await newUser.save();

                    handler.set.status = 201;

                    return newUser;
                } catch (e: any) {
                    // If unique mongoose constraint (for username or email) is violated
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
                    summary: 'Add one user',
                    tags: ['Crud User'],
                    description: "Add resources for one new user in database",
                    responses: {
                        "200": {
                            description: "Add resources for one new user",
                        }
                    }
                }
            })
            .get('/', async ({ set }: Elysia.Set) => {
                try {
                    const users = await User.find({});
                    return users;
                } catch (e: unknown) {
                    set.status = 500;
                    return {
                        message: 'Unable to retrieve items from the database!',
                        status: 500,
                    };
                }
            }, {
                detail: {
                    summary: 'Get all users',
                    tags: ['Crud User'],
                    description: "Shows all users in database",
                    responses: {
                        "200": {
                            description: "List of users",
                        }
                    }
                }
            })

            .get('/:id', async (handler: Elysia.Handler) => {
                try {
                    const { id } = handler.params;

                    const existingUser = await User.findById(id);

                    if (!existingUser) {
                        handler.set.status = 404;
                        return {
                            message: 'Requested resource was not found!',
                            status: 404,
                        };
                    }

                    return existingUser;
                } catch (e: unknown) {
                    handler.set.status = 500;
                    return {
                        message: 'Unable to retrieve the resource!',
                        status: 500,
                    };
                }
            }, {
                detail: {
                    summary: 'Get one user',
                    tags: ['Crud User'],
                    description: "Shows one specific user in database",
                    responses: {
                        "200": {
                            description: "Information of one user",
                        }
                    }
                }
            })

            .patch('/:id', async (handler: Elysia.Handler) => {
                try {
                    const { id } = handler.params;

                    const changes: Partial<IUser> = handler.body;

                    const updatedUser = await User.findOneAndUpdate(
                        { _id: id },
                        { $set: { ...changes } },
                        { new: true }
                    );

                    if (!updatedUser) {
                        handler.set.status = 404;
                        return {
                            message: `User with id: ${id} was not found.`,
                            status: 404,
                        };
                    }

                    return updatedUser;
                } catch (e: unknown) {
                    handler.set.status = 500;
                    return {
                        message: 'Unable to update resource!',
                        status: 500,
                    };
                }
            }, {
                detail: {
                    summary: 'Modify one user',
                    tags: ['Crud User'],
                    description: "Update one specific user in database",
                    responses: {
                        "200": {
                            description: "Change resources of one specific user",
                        }
                    }
                }
            })

            .delete('/:id', async (handler: Elysia.Handler) => {
                try {
                    const { id } = handler.params;

                    const existingUser = await User.findById(id);

                    if (!existingUser) {
                        handler.set.status = 404;
                        return {
                            message: `User with id: ${id} was not found.`,
                            status: 404,
                        };
                    }

                    await User.findOneAndRemove({ _id: id });

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
                        summary: 'Delete one user',
                        tags: ['Crud User'],
                        description: "Remove one specific user in database",
                        responses: {
                            "200": {
                                description: "Delete all the resources of one specific user",
                            }
                        }
                    }
                })
    );
import * as z from 'zod';

export const UserValidation = z.object({
	profile_photo: z.string().url().nonempty(),
	name: z.string().min(3, { message: 'MINIMUM 3 CHARS' }).max(30, { message: 'MAXIMUM 30 CHARS' }),
	username: z.string().min(3, { message: 'MINIMUM 3 CHARS' }).max(30, { message: 'MAXIMUM 30 CHARS' }),
	bio: z.string().min(3, { message: 'MINIMUM 3 CHARS' }).max(1000, { message: 'MAXIMUM 1000 CHARS' }),
});

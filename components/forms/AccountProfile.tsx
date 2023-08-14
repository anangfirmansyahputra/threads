'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import * as z from 'zod';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import { Textarea } from '../ui/textarea';

interface Props {
	user: {
		id: string;
		objectId: string;
		username: string;
		name: string;
		bio: string;
		image: string;
	};
	btnTitle: string;
}

const listInput = [
	{
		label: 'Name',
		name: 'name',
		type: 'text',
	},
	{
		label: 'Username',
		name: 'username',
		type: 'text',
	},
	{
		label: 'Bio',
		name: 'bio',
		type: 'textarea',
	},
];

const AccountProfile = ({ user, btnTitle }: Props) => {
	const form = useForm({
		defaultValues: {
			profile_photo: '',
			name: '',
			username: '',
			bio: '',
		},
		resolver: zodResolver(UserValidation),
	});

	const handleImage = (e: ChangeEvent, fieldChange: (value: string) => void) => {
		e.preventDefault();
	};

	function onSubmit(values: z.infer<typeof UserValidation>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col justify-start gap-10'
			>
				<FormField
					control={form.control}
					name='profile_photo'
					render={({ field }) => (
						<FormItem className='flex items-center gap-4'>
							<FormLabel className='account-form_image-label'>
								{field.value ? (
									<Image
										src={field.value}
										alt='profile photo'
										width={96}
										height={96}
										priority
										className='rounded-full object-contain'
									/>
								) : (
									<Image
										src='/assets/profile.svg'
										alt='profile photo'
										width={24}
										height={24}
										className='object-contain'
									/>
								)}
							</FormLabel>

							<FormControl className='flex-1 text-base-semibold text-gray-200 '>
								<Input
									type='file'
									accept='image/*'
									placeholder='Upload a photo'
									className='account-form_image-input'
									onChange={(e) => handleImage(e, field.onChange)}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				{listInput.map((obj) => (
					<FormField
						key={obj.label}
						control={form.control}
						name={obj.name}
						render={({ field }) => (
							<FormItem className='flex flex-col gap-3 w-full'>
								<FormLabel className='text-base-semibold text-light-2'>{obj.label}</FormLabel>
								<FormControl>
									{obj.type !== 'textarea' ? (
										<Input
											type='text'
											className='account-form_input no-focus'
											onChange={(e) => handleImage(e, field.onChange)}
										/>
									) : (
										<Textarea
											rows={10}
											className='account-form_input no-focus'
											{...field}
										/>
									)}
								</FormControl>
							</FormItem>
						)}
					/>
				))}

				<Button
					type='submit'
					className='bg-primary-500'
				>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default AccountProfile;

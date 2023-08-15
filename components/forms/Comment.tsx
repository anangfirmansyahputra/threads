'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CommentValidation, ThreadValidation } from '@/lib/validations/thread';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Textarea } from '../ui/textarea';
import { addCommentToThread, createThread } from '@/lib/actions/thread.actions';
import z from 'zod';
import { Input } from '../ui/input';
import Image from 'next/image';

interface Props {
	threadId: string;
	currentUserImg: string;
	currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
	const pathname = usePathname();
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			thread: '',
		},
		resolver: zodResolver(CommentValidation),
	});

	const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
		await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname);

		form.reset();
	};

	return (
		<Form {...form}>
			<form
				className='comment-form'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name='thread'
					render={({ field }) => (
						<FormItem className='flex w-full items-center gap-3'>
							<FormLabel>
								<Image
									src={currentUserImg}
									alt='Profile image'
									width={48}
									height={48}
									className='rounded-full object-cover'
								/>
							</FormLabel>
							<FormControl className='border-none bg-transparent'>
								<Input
									type='text'
									placeholder='Comment...'
									className='no-focus text-light-1 outline-none'
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='comment-form_btn'
				>
					Reply
				</Button>
			</form>
		</Form>
	);
};

export default Comment;

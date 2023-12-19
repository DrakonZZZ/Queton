'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { ProfileEditSchema } from '@/lib/validators';
import { usePathname, useRouter } from 'next/navigation';
import { updateUser } from '@/lib/actions/user.action';

interface ProfileProps {
  clerkId: string;
  user: string;
}

const Profile = ({ clerkId, user }: ProfileProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const parsedUser = JSON.parse(user);

  const form = useForm<z.infer<typeof ProfileEditSchema>>({
    resolver: zodResolver(ProfileEditSchema),
    defaultValues: {
      name: parsedUser.name || '',
      username: parsedUser.username || '',
      location: parsedUser.loaction || '',
      personalPage: parsedUser.personalPage || '',
      bio: parsedUser.bio || '',
    },
  });

  async function onSubmit(values: z.infer<typeof ProfileEditSchema>) {
    setIsSubmitting(true);

    try {
      // update user
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          location: values.location,
          personalPage: values.personalPage,
          bio: values.bio,
        },
        path: pathname,
      });
      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full mt-9 flex flex-col gap-9"
      >
        <div className="flex justify-between gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-3.5 flex-1 dark:text-white">
                <FormLabel>
                  Name <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    {...field}
                    className="no-focus paragraph-regular light-border-2 background-light-700_dark-300 text-dark-300_light-700 min-h-[56px] border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-3.5 flex-1 dark:text-white">
                <FormLabel>
                  Username <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    className="no-focus paragraph-regular light-border-2 background-light-700_dark-300 text-dark-300_light-700 min-h-[56px] border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-6">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="space-y-3.5 dark:text-white w-1/3">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Location"
                    {...field}
                    className="no-focus paragraph-regular light-border-2 background-light-700_dark-300 text-dark-300_light-700 min-h-[56px] border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="personalPage"
            render={({ field }) => (
              <FormItem className="space-y-3.5 dark:text-white w-2/3">
                <FormLabel>Personal Site</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="Site link"
                    {...field}
                    className="no-focus paragraph-regular light-border-2 background-light-700_dark-300 text-dark-300_light-700 min-h-[56px] border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-3.5 dark:text-white">
              <FormLabel>
                Bio <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your self"
                  {...field}
                  className="no-focus paragraph-regular light-border-2 background-light-700_dark-300 text-dark-300_light-700 min-h-[56px] border"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-5 flex justify-end">
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-black text-white dark:bg-white dark:text-black min-h-[40px] p-3 rounded-md hover:bg-black/70 dark:hover:bg-white/80 transistion w-[200px]"
          >
            {isSubmitting ? 'Saving Changes...' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Profile;

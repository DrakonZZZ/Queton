'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AskSchema } from '@/lib/validators';

const AskForm = () => {
  const form = useForm<z.infer<typeof AskSchema>>({
    resolver: zodResolver(AskSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: [],
    },
  });

  function onSubmit(values: z.infer<typeof AskSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark-400_light-800">
                Question Title <span className="text-primary-500"> *</span>
              </FormLabel>
              <FormControl className="mt-3.5">{/* editor input */}</FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific with your question
              </FormDescription>
              <FormMessage className="text-primary-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark-400_light-800">
                Detailed Description of your question
                <span className="text-primary-500"> *</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="min-h-[48px] paragraph-regular no-focus  text-dark-300_light-700 border-black/20 dark:border-white/30"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Provide further comprehensive information regarding your query
              </FormDescription>
              <FormMessage className="text-primary-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark-400_light-800">
                Tags
                <span className="text-primary-500"> *</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  placeholder="Tags here..."
                  className="min-h-[48px] paragraph-regular no-focus  text-dark-300_light-700 border-black/20 dark:border-white/30"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                You can add tags related to your question by describing the main
                topic or subject matter. (Press enter to add a tag)
              </FormDescription>
              <FormMessage className="text-primary-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-black text-white dark:bg-white dark:text-black min-h-[30px] px-4 py-3 rounded-md hover:bg-black/70 dark:hover:bg-white/80 transistion"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AskForm;

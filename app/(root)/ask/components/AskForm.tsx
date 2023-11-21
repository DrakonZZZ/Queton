'use client';

import React, { useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Button } from '@/components/ui/button';
import { Editor } from '@tinymce/tinymce-react';

import { AskSchema } from '@/lib/validators';
import Tag from '@/components/Tag';
import { askQuestion } from '@/lib/actions/ask.action';

interface AskProps {
  dbUserId: string;
}

const AskForm = ({ dbUserId }: AskProps) => {
  const [isSubmitting, setSubmitting] = useState(false);
  // editor reference
  const editorRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  //for button type
  const type: any = 'create';

  const form = useForm<z.infer<typeof AskSchema>>({
    resolver: zodResolver(AskSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: [],
    },
  });

  async function onSubmit(values: z.infer<typeof AskSchema>) {
    setSubmitting(true);
    try {
      //api call to backend containing all form data
      await askQuestion({
        title: values.title,
        content: values.description,
        tags: values.tags,
        author: JSON.parse(dbUserId),
      });
      //redirect to home page
      router.push('/');
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
    console.log(values);
  }

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === 'Enter' && field.name === 'tags') {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== '') {
        if (tagValue.length > 15) {
          return form.setError('tags', {
            type: 'required',
            message: 'Tag must be less than 15 characters.',
          });
        }

        //checking if tag doesn't exist in the field
        if (!field.value.includes(tagValue as never)) {
          form.setValue('tags', [...field.value, tagValue]);
          tagInput.value = '';
          form.clearErrors('tags');
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((tagName: string) => tagName !== tag);
    form.setValue('tags', newTags);
  };

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
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="min-h-[48px] paragraph-regular no-focus  text-dark-300_light-700 border-black/20 dark:border-white/30"
                />
              </FormControl>
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
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_EDITOR}
                  onInit={(evt, editor) =>
                    // @ts-ignore
                    (editorRef.current = editor)
                  }
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue=""
                  init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                      'undo redo | formatselect | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat ',
                    content_style:
                      'body { font-family:Inter,Arial,sans-serif; font-size:14px }',
                  }}
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
                <>
                  <Input
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                    placeholder="Tags here..."
                    className="min-h-[48px] paragraph-regular no-focus  text-dark-300_light-700 border-black/20 dark:border-white/30"
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start gap-2 mt-2.5 ">
                      {field.value.map((tag: any) => {
                        return (
                          <div
                            key={tag}
                            onClick={() => handleTagRemove(tag, field)}
                          >
                            <Tag
                              title={tag}
                              addonClasses="bg-black/80 dark:bg-white text-white dark:text-black py-1 px-3 text-sm cursor-pointer"
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
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
          className="w-fit bg-black text-white dark:bg-white dark:text-black min-h-[30px] px-6 py-3 rounded-md hover:bg-black/70 dark:hover:bg-white/80 transistion self-end"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === 'edit' ? 'Editing...' : 'Posting...'}</>
          ) : (
            <>{type === 'edit' ? 'Edit Question' : 'Ask a Question'}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AskForm;

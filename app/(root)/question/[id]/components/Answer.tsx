'use client';

import { useRef, useState } from 'react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import z from 'zod';
import { AnswerSchema } from '@/lib/validators';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import { useSkin } from '@/context/skinProvider';
import { Button } from '@/components/ui/button';
import { FaWandMagicSparkles } from 'react-icons/fa6';

export const Answer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { skin } = useSkin();
  console.log(skin);
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: '',
    },
  });

  const handleCreateAnswer = (data) => {};

  return (
    <div>
      <div className="mt-6 mb-2 mx-2 flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark-400_light-800">
          Reply to this question
        </h4>
        <Button className="w-fit flex gap-2 bg-black text-white dark:bg-white dark:text-black min-h-[30px] px-6 py-3 rounded-md hover:bg-black/70 dark:hover:bg-white/80 transistion self-end">
          <FaWandMagicSparkles />
          Generate an AI answer
        </Button>
      </div>
      <Form {...form}>
        <form
          className="w-full flex flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_EDITOR}
                    onInit={(evt, editor) =>
                      // @ts-ignore
                      (editorRef.current = editor)
                    }
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'print',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'paste',
                        'code',
                        'help',
                        'wordcount',
                        'codesample',
                      ],
                      toolbar:
                        'undo redo | formatselect | ' +
                        'codesample | bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat ',
                      content_style:
                        'body { font-family:Inter,Arial,sans-serif; font-size:14px }',
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="w-fit bg-black text-white dark:bg-white dark:text-black min-h-[30px] px-6 py-3 rounded-md hover:bg-black/70 dark:hover:bg-white/80 transistion self-end"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'submitting...' : 'submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

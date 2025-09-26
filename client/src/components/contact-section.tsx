import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/i18n";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { Mail, MessageSquare, Clock } from "lucide-react";

interface ContactSectionProps {
  language: string;
}

const contactFormSchema = insertContactSubmissionSchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactSection({ language }: ContactSectionProps) {
  const t = useTranslation(language as any);
  const isRTL = language === 'ar';
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      language: language,
    },
  });

  const onSubmit = (data: ContactFormData) => {
    // Create mailto link with form data
    const subject = `Driving Lesson Inquiry - ${data.firstName} ${data.lastName}`;
    const body = `Hello Top Automaat Les,

I am interested in driving lessons and would like to get more information.

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.service ? `Preferred Service: ${data.service}` : ''}

Message:
${data.message}

Best regards,
${data.firstName} ${data.lastName}`;

    const mailtoLink = `mailto:Laithrazzak@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message and reset form
    toast({
      title: "Success",
      description: t('contact.form.success'),
      variant: "default",
    });
    form.reset();
  };

  return (
    <section id="contact" className={`py-20 bg-card ${isRTL ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="contact-title">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="contact-subtitle">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6" data-testid="contact-info-title">
                {t('contact.info.title')}
              </h3>
              <div className="space-y-6">
                <div className={`flex items-start space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{t('contact.info.email.title')}</h4>
                    <a href="mailto:Laithrazzak@gmail.com" className="text-muted-foreground hover:text-primary transition-colors" data-testid="contact-email">
                      Laithrazzak@gmail.com
                    </a>
                  </div>
                </div>

                <div className={`flex items-start space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{t('contact.info.whatsapp.title')}</h4>
                    <a href="https://wa.me/31614681863" className="text-muted-foreground hover:text-accent transition-colors" data-testid="contact-whatsapp">
                      +31 6 14681863
                    </a>
                  </div>
                </div>

                <div className={`flex items-start space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{t('contact.info.hours.title')}</h4>
                    <div className="text-muted-foreground">
                      <p>{t('contact.info.hours.weekdays')}</p>
                      <p>{t('contact.info.hours.weekend')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle>{t('contact.form.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.firstName')}</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-firstName" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.lastName')}</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-lastName" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.email')}</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.phone')}</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} value={field.value || ''} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.service')}</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ''}>
                          <FormControl>
                            <SelectTrigger data-testid="select-service">
                              <SelectValue placeholder={t('contact.form.service.select')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="single">{t('contact.form.service.single')}</SelectItem>
                            <SelectItem value="package">{t('contact.form.service.package')}</SelectItem>
                            <SelectItem value="trial">{t('contact.form.service.trial')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.message')}</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} placeholder="Tell us about your driving experience and goals..." data-testid="textarea-message" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    data-testid="button-submit-contact"
                  >
                    {t('contact.form.submit')}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

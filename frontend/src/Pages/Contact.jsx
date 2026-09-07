import { Form, useActionData, useNavigation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi';
const Contact = () => {
  // Data returned from action function
  const actionData = useActionData();
  // Navigation state for loading button
  const navigation = useNavigation();
  // Form reference for resetting fields
  const formRef = useRef(null);

  const isSubmitting = navigation.state === 'submitting';

  // Handle contact form response
  useEffect(() => {
    if (!actionData) return;

    if (actionData.success) {
      toast.success(actionData.message);

      formRef.current?.reset();
    } else {
      toast.error(actionData.message);
    }
  }, [actionData]);

  return (
    <section className="bg-[#020817] py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto border border-slate-700 rounded-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left Side */}
          <div className="bg-[#08152f] p-10 lg:p-16">
            <h2 className="text-5xl font-bold text-white mb-8">Get in Touch</h2>

            <p className="text-gray-400 text-lg leading-9">
              Have questions about our courses or platform? We'd love to hear from you. Fill out the
              form and our team will get back to you as soon as possible.
            </p>

            <div className="mt-16 space-y-10">
              <div className="flex items-start gap-4">
                <HiOutlineLocationMarker className="text-3xl text-indigo-500 mt-1" />
                <div>
                  <h3 className="text-white text-lg font-semibold">Address</h3>
                  <p className="text-gray-400">Kolkata, West Bengal, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <HiOutlinePhone className="text-3xl text-indigo-500 mt-1" />
                <div>
                  <h3 className="text-white text-lg font-semibold">Phone</h3>
                  <p className="text-gray-400">+91 9304490856</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <HiOutlineMail className="text-3xl text-indigo-500 mt-1" />
                <div>
                  <h3 className="text-white text-lg font-semibold">Email</h3>
                  <p className="text-gray-400">sickykumar01@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-[#071226] p-10 lg:p-16 lg:z-10">
            <Form ref={formRef} className="space-y-6" method="POST">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">First Name</label>

                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Last Name</label>

                  <input
                    name="lastName"
                    type="text"
                    placeholder="Enter last name"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your Phone Number"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Subject</label>

                <input
                  type="text"
                  name="subject"
                  placeholder="Enter your Subject"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Message</label>

                <textarea
                  rows="6"
                  name="message"
                  placeholder="Write your message..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500 resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};;;

export default Contact;

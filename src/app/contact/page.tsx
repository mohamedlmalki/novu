'use client'
import { ChangeEvent, FormEvent, useState } from "react"
import InAppNotification from "./InAppNotification";
import { useRouter, useSearchParams } from 'next/navigation'


export default function Contact() {
    const router = useRouter();
    const searchParam = useSearchParams();

    const [input, setInput] = useState({
        name: '',
        email: '',
        message: ''
    });

    const onInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        return setInput({ ...input, [name]: value });
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const res = await fetch('/contact/api', { method: 'post', body: JSON.stringify({ ...input }) });
        const data = await res.json();

        console.log(data);

        reloadWithSub(data.subscriberId)
        setInput({ name: '', email: '', message: '' })
    }

    const reloadWithSub = (subId: string) => {
        const currentUrl = window.location.pathname;
        const newUrl = `${currentUrl}?subId=${subId}`;

        router.replace(newUrl);
    }

    const subId = searchParam.get('subId') || '';
    return (
        <main className="bg-gray-100 p-6 h-[100vh] text-black">
            <InAppNotification subscriberId={subId} />

            <div className="max-w-md mx-auto bg-white mt-10 p-8 border rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-black">Contact Us</h2>

                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input type="text" value={input.name} onChange={onInputChange} id="name" name="name" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="email" value={input.email} onChange={onInputChange} id="email" name="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                        <textarea id="message" value={input.message} onChange={onInputChange} name="message" rows={4} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"></textarea>
                    </div>

                    <div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
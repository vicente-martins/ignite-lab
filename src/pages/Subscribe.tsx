import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import codeMockup from '../assets/code-mockup.png';
import { Logo } from "../components/Logo";

const CREATE_SUBSCRIBER_MUTATION = gql`
    mutation CreateSubscriber ($name:String!, $email: String!) {
        createSubscriber(data: {name: $name, email: $email}) {
            id
        }
    }
`

export function Subscribe() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION);

    function handleSubscribe(event: FormEvent) {
        event.preventDefault();
        
        createSubscriber({
            variables: {
                name,
                email
            }
        }).then(
            () => navigate('/event') 
        );
    }

    return (
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat pt-2">
            <div className="flex flex-col items-center bg-reactIcon bg-top bg-no-repeat">
                <div className="w-full max-w-[1100px] flex flex-col sm:flex-row sm:items-center justify-between mt-4 sm:mt-20 mx-auto">
                    <div className="max-w-[640px] p-8 sm:p-0 text-center flex flex-col sm:block">
                        <div className="place-self-center">
                            <Logo />
                        </div>

                        <h1 className="mt-8 text-[2.5rem] leading-tight sm:text-justify">
                            Build a <strong className="text-blue-500">full application</strong>, from scratch, using <strong className="text-blue-500">React</strong>
                        </h1>
                        <p className="mt-4 text-gray-200 leading-relaxed text-justify">
                            In just a week you'll learn one of the most used technologies with a high demand for professionals and the best job opportunities.
                        </p>
                    </div>
                    
                    <div className="p-8 bg-gray-700 border border-gray-500 rounded">
                        <strong className="text-2xl mb-6 block">Subscribe for free</strong>

                        <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
                            <input
                                className="bg-gray-900 rounded px-5 h-14 outline-none outline-1 hover:outline-green-300 focus:outline-green-300 transition-colors"
                                type="text"
                                placeholder="Full name"
                                onChange={event => setName(event.target.value)}
                            />
                            <input
                                className="bg-gray-900 rounded px-5 h-14 outline-none outline-1 hover:outline-green-300 focus:outline-green-300 transition-colors"
                                type="email"
                                placeholder="Email address"
                                onChange={event => setEmail(event.target.value)}
                            />

                            <button 
                                className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                                disabled={loading}
                                type="submit"
                            >
                                Subscribe
                            </button>

                            <Link to={'/event'} className="text-center mt-1 text-gray-400">Already a subscriber? Click here</Link>
                        </form>
                    </div>
                </div>

                <img src={codeMockup} className="sm:mt-10 px-2 sm:px-0" alt="Code-Mockup" />
            </div>
        </div>
    )
}

import Container from "../components/container/Container";


export default function Footer() {
    return (
        <footer className="bg-gray-800 py-4 w-full">
            <Container>
                <div className="mb-4 flex flex-wrap md:flex-row justify-around md:justify-center gap-6 md:gap-x-12 lg:gap-28 items-center">
                    <div className="flex items-center">
                        <img
                            src="/logo-transparent.png"
                            alt="Logo"
                            className="size-24 md:size-32 lg:size-44"
                        />
                        <div className="ml-4">
                            <h1 className="text-white text-sm md:text-lg font-semibold">
                                Vandra Kitchen
                            </h1>
                            <p className="text-sm text-gray-400 lg:w-full w-4/5">
                                Discover the best recipes for your next meal
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-1.5">
                        <h2 className="text-white text-sm md:text-lg font-semibold">
                            Contact
                        </h2>
                        <a href="#" className="text-xs text-gray-400 font-medium">
                            Email
                        </a>
                        <a href="#" className="text-xs text-gray-400 font-medium">
                            Phone
                        </a>
                        <a href="#" className="text-xs text-gray-400 font-medium">
                            Address
                        </a>
                    </div>
                    <div className="flex flex-col gap-y-1.5">
                        <h2 className="text-white text-sm md:text-lg font-semibold">
                            Follow Us
                        </h2>
                        <a href="#" className="text-xs text-gray-400 font-medium">
                            Facebook
                        </a>
                        <a href="#" className="text-xs text-gray-400 font-medium">
                            Instagram
                        </a>
                        <a href="#" className="text-xs text-gray-400 font-medium">
                            Twitter
                        </a>
                    </div>
                    <div className="flex flex-col gap-y-1.5">
                        <h2 className="text-white text-sm md:text-lg font-semibold">
                            Legal
                        </h2>
                        <a href="#" className="text-xs text-gray-400 font-medium">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-xs text-gray-400 font-medium">
                            Terms and Conditions
                        </a>
                        <a href="#" className="text-xs text-gray-400 font-medium">
                            Cookie Policy
                        </a>
                    </div>
                </div>
                <div className="mx-auto text-center text-[10px] sm:text-xs pt-4 text-white">
                    <p>&copy; 2025 Vandra Kicthen. All rights reserved.</p>
                    <p>Created by Kevin Andra Nugroho</p>
                </div>
            </Container>
        </footer>
    )
}
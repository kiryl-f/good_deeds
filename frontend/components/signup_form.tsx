import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';


import '../src/app/globals.css';

const Container = styled.div`
    min-height: 100vh;
    background-color: #f9fafb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem 1.5rem;
    @media (min-width: 640px) {
        padding: 3rem;
    }
    @media (min-width: 1024px) {
        padding: 3rem 2rem;
    }
`;

const Header = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 28rem;
    text-align: center;
`;

const Title = styled.h2`
    margin-top: 1.5rem;
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 800;
    color: #1f2937;
`;

const Subtitle = styled.p`
    margin-top: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #6b7280;
    max-width: 100%;
`;

const StyledLink = styled(Link)`
    margin-left: 0.25rem;
    color: #3b82f6;
    font-weight: 500;
    &:hover {
        color: #2563eb;
        text-decoration: underline;
    }
    &:focus {
        outline: none;
        text-decoration: underline;
    }
`;

const FormContainer = styled.div`
    margin-top: 2rem;
    margin: 0 auto;
    width: 100%;
    max-width: 28rem;
    background-color: #ffffff;
    padding: 2rem 1rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
    @media (min-width: 640px) {
        padding: 2rem;
    }
`;

const Form = styled.form`
    display: grid;
    gap: 1.5rem;
`;

const Label = styled.label`
    display: block;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: #374151;
`;

const InputContainer = styled.div`
    position: relative;
    margin-top: 0.25rem;
`;

const Input = styled.input`
    appearance: none;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    placeholder-color: #9ca3af;
    font-size: 0.875rem;
    line-height: 1.25rem;
    &:focus {
        outline: none;
        border-color: #93c5fd;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
    }
`;

const UsernameInputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.25rem;
`;

const UsernamePrefix = styled.span`
    display: inline-flex;
    height: 2.5rem;
    align-items: center;
    padding: 0 0.75rem;
    border: 1px solid #d1d5db;
    border-right: 0;
    border-radius: 0.375rem 0 0 0.375rem;
    background-color: #f9fafb;
    color: #6b7280;
    font-size: 0.875rem;
`;

const SubmitButton = styled.button`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    background-color: #3b82f6;
    color: #ffffff;
    font-size: 0.875rem;
    font-weight: 500;
    &:hover {
        background-color: #2563eb;
    }
    &:focus {
        outline: none;
        background-color: #1e40af;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
    }
`;

export default function Signup() {
    return (
        <Container>
            <Header>
                <Image
                    className="mx-auto h-10 w-auto"
                    src="https://www.svgrepo.com/show/301692/login.svg"
                    alt="Workflow"
                    width={40}
                    height={40}
                />
                <Title>Create a new account</Title>
                <Subtitle>
                    Or
                    <StyledLink href="/login">login to your account</StyledLink>
                </Subtitle>
            </Header>

            <FormContainer>
                <Form method="POST" action="#">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <InputContainer>
                            <Input
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                type="text"
                                required
                            />
                        </InputContainer>
                    </div>

                    <div>
                        <Label htmlFor="username">Username</Label>
                        <UsernameInputContainer>
                            <UsernamePrefix>goodeeds.com/</UsernamePrefix>
                            <Input
                                id="username"
                                name="username"
                                placeholder="john"
                                type="text"
                                required
                            />
                        </UsernameInputContainer>
                    </div>

                    <div>
                        <Label htmlFor="email">Email address</Label>
                        <InputContainer>
                            <Input
                                id="email"
                                name="email"
                                placeholder="user@example.com"
                                type="email"
                                required
                            />
                        </InputContainer>
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <InputContainer>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                        </InputContainer>
                    </div>

                    <div>
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <InputContainer>
                            <Input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                required
                            />
                        </InputContainer>
                    </div>

                    <SubmitButton type="submit">
                        Create account
                    </SubmitButton>
                </Form>
            </FormContainer>
        </Container>
    );
}

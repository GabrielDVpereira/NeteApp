
import { useState } from "react";
import { Button, Input, Title } from "_/components";
import { useAuth } from "_/contexts";

export function Home(){
    const [value, setValue] = useState('')

    const { logout } = useAuth()

    return(
        <>
            <Title>
                Home Page
            </Title>
            <Input value={value} onChange={(e) => setValue(e.target.value)} label="Label" />
            <Button onClick={() => console.log('button')} size='full'>Button</Button>
            <Button onClick={logout}>Logout</Button>

        </>
    )
}
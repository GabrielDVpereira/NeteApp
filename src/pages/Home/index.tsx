
import { useState } from "react";
import { Button, Title } from "_/components";

export function Home(){
    const [value, setValue] = useState('')

    return(
        <>
            <Title>
                Home Page
            </Title>
            <Button onClick={() => console.log('button')} size='full'>Button</Button>
        </>
    )
}
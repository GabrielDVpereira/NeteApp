
import { useState } from "react";
import { Button, Input, Title } from "_/components";

export function Home(){
    const [value, setValue] = useState('')

    return(
        <>
            <Title>
                Home Page
            </Title>
            <Input value={value} onChange={(e) => setValue(e.target.value)} label="Label" />
            <Button onClick={() => console.log('button')} size='full'>Button</Button>
        </>
    )
}
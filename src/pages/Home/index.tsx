
import { useState } from "react";
import { Input, Title } from "_/components";

export function Home(){
    const [value, setValue] = useState('')

    return(
        <>
            <Title>
                Home Page
            </Title>

            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="placeholder"
                label="write here:"
            />
        </>
    )
}
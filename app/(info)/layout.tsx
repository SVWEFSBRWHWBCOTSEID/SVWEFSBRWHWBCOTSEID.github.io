import {ReactNode} from 'react';
import Footer from '../../components/Footer';


export default function Layout(props: {children: ReactNode}) {
    return (
        <>
            {props.children}
            <Footer />
        </>
    )
}

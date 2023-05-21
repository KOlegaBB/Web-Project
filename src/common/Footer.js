import './footer.css'

export default function Footer(props) {
    return <div className={'footer'}>
        <p className={'text'}>
            <span>Бюро ритуальних послуг</span> <br/>
            <span>«Могилянка»</span> <br/>
            <span>м. Львів, вул. Козельницька, 2а</span>
        </p>
        <p className={'text'}>
            <span>Зв’яжіться з нами:</span> <br/>
            <span>mohyla@ucu.edu.ua</span> <br/>
            <span>+380 99 140 01 25</span>
        </p>
    </div>
}
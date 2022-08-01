const Kuva = (props) => {

const url = 'http://openweathermap.org/img/wn/' + props.linkki + '@2x.png'
    return(
        <div>
<img src= {url} />

</div>
    )
}

export default Kuva
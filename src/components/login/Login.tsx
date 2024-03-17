import './Login.css'


export default function Login(){
    return (
        <div className="container">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="card login-content shadow-lg border-0">
                        <div className="card-body">
                            <div className="text-center">
                                <img className="logo" src="https://cdn3.iconfinder.com/data/icons/galaxy-open-line-gradient-i/200/account-256.png"/>
                            </div>

                            <h3 className="text-logo">Sign In</h3>
                            <br/>

                            <form className="text-center">
                                <input className="form-control border-0" type="" name="" placeholder="Type Your Username"/>
                                <br/>
                                <input className="form-control border-0" type="" name="" placeholder="Type Your Password"/>
                                <br/>
                                <button className="btn btn-primary btn-sm border-0" type="submit" name="submit">Sign In</button>
                                <p className="forgot"><a href="">Forgot Password?</a></p>
                            </form>
                        </div>
                        <div className="nomember">
                        <p className="text-center">Not a member? <a href="">Create an Account</a></p>
                        </div>
                    </div>
                </div>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-popRpmFF9JQgExhfw5tZT4I9/CI5e2QcuUZPOVXb1m7qUmeR2b50u+YFEYe1wgzy" crossOrigin="anonymous"></script>
        </div>
        
    );
}
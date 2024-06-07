import React from 'react';
import { Container, Grid, TextField, Typography, Button } from '@material-ui/core';
import { call, updateinfo } from './ApiService';
import NavigationBar from '../components/NavigationBar'

class UpdateInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            error: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // 현재 사용자 정보를 가져오는 API 호출
        call("/auth/userinfo", "GET", null)
            .then((response) => {
                if (response) {
                    this.setState({
                        username: response.username,
                        email: response.email,
                        // password는 기본적으로 빈 문자열로 유지
                    });
                }
            })
            .catch((error) => {
                console.error("사용자 정보를 가져오는 중 오류 발생:", error);
                this.setState({ error: "사용자 정보를 가져오는 중 오류 발생" });
            });
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { username, email, password } = this.state;

        updateinfo({ email, username, password })
            .then((response) => {
                window.location.href = "/auth/userinfo";
            })
            .catch((error) => {
                console.error("회원정보 수정 오류:", error); // 오류 로그 추가
                this.setState({ error: "회원정보 수정 오류!" });
            });
    }

    render() {
        return (
            <div className="updateinfo">
                <NavigationBar username={this.state.username} />
                <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
                <form noValidate onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5">
                                정보 수정
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="사용자 이름"
                                autoFocus
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="이메일 주소"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="current-password"
                                name="password"
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="패스워드"
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        {this.state.error && (
                            <Grid item xs={12}>
                                <Typography color="error">
                                    {this.state.error}
                                </Typography>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary">
                                계정 수정 
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
            </div>
        );
    }
}

export default UpdateInfo;

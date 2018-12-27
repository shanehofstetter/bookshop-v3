import * as React from "react";
import {withNamespaces} from "react-i18next";
import {Api} from "../../middleware/api";
import Form from "../forms/form";
import Text from "../forms/text";
import TextArea from "../forms/textarea";
import {withAlert} from "react-alert";
import {inject, observer} from "mobx-react";
import {Button} from "semantic-ui-react";
import {withRouter} from "react-router";
import DateTimePicker from '../forms/dateTimePicker';
import compose from "compose-function";

class BookCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {errors: {}};
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.getFormApi = this.getFormApi.bind(this);
    }

    handleOnSubmit(book) {
        Api.books.create(book).then(book => {
            this.setState({errors: {}});
            this.formApi.reset();
            this.props.store.bookStore.addBook(book);
            this.props.alert.show(`Book '${book.title}' successfully added.`, {type: 'success'});
            if (this.props.afterCreatePath) {
                this.props.history.push(this.props.afterCreatePath);
            }
        }).catch(formErrors => {
            this.setState({errors: formErrors});
            this.props.alert.show('Book could not be saved.', {type: 'warning'});
        });
    }

    getFormApi(formApi) {
        this.formApi = formApi;
    }

    render() {
        const {t} = this.props;
        return <Form onSubmit={this.handleOnSubmit} getApi={this.getFormApi} className={'ui form'}>
            <div className={'field'}>
                <label htmlFor={'title'}>{t('activerecord.attributes.book.title')}*</label>
                <Text field="title" id={'title'} errors={this.state.errors.title}/>
            </div>
            <div className={'field'}>
                <label htmlFor={'description'}>{t('activerecord.attributes.book.description')}*</label>
                <TextArea field="description" id={'description'} errors={this.state.errors.description}/>
            </div>
            <div className={'field'}>
                <label htmlFor={'isbn'}>{t('activerecord.attributes.book.isbn')}*</label>
                <Text field="isbn" id={'isbn'} errors={this.state.errors.isbn}/>
            </div>
            <div className={'field'}>
                <label htmlFor={'published_at'}>{t('activerecord.attributes.book.published_at')}</label>
                <DateTimePicker field={'published_at'} id={'published_at'}/>
            </div>
            <Button type="submit">{t('form.submit')}</Button>
        </Form>
    }
}

export default compose(
    withRouter,
    withAlert,
    withNamespaces('translation'),
    inject('store'),
    observer
)(BookCreateForm);

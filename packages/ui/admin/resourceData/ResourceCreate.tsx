
import * as React from 'react';
import { Create, TabbedForm, TextInput, required, RichTextField } from 'react-admin';




const ResourceCreate = () => (
    <Create>
        <TabbedForm defaultValues={{ sales: 0 }}>
            <TabbedForm.Tab
                label="resources.products.tabs.image"
                sx={{ maxWidth: '40em' }}
            >
                <TextInput
                    autoFocus
                    source="image"
                    fullWidth
                    validate={required()}
                />
                <TextInput source="thumbnail" fullWidth validate={required()} />
            </TabbedForm.Tab>

            <TabbedForm.Tab
                label="resources.products.tabs.description"
                path="description"
            >
                <RichTextField source="description" label="" />
            </TabbedForm.Tab>
        </TabbedForm>
    </Create>
);

export default ResourceCreate;
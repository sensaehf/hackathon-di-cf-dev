import { gql } from "@apollo/client";

export const UpdatePerDiemMutation = gql`
mutation UpdatePerDiemsAndPerks($updatePerDiemAndPerkInput: UpdatePerDiemAndPerkInput!) {
    updatePerDiemAndPerk( updatePerDiemAndPerkInput: $updatePerDiemAndPerkInput) {
        id
        taxSubmissionId
        type
        amount
        currency
        description
    }
}
`

export const CreatePerDiemMutation = gql`
    mutation CreatePerDiemsAndPerks($createPerDiemAndPerkInput: CreatePerDiemAndPerkInput!) {
        createPerDiemAndPerk( createPerDiemAndPerkInput: $createPerDiemAndPerkInput) {        
        taxSubmissionId
        type
        amount
        currency
        description
    }   
}
`

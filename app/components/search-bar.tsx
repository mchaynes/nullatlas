import { Form, useSearchParams, useSubmit } from '@remix-run/react'
import { useDebounce, useIsPending } from '#app/utils/misc.tsx'
import { Icon } from './ui/icon.tsx'
import { Input } from './ui/input.tsx'
import { Label } from './ui/label.tsx'
import { StatusButton } from './ui/status-button.tsx'

export function SearchBar({
	status,
	autoFocus = false,
	autoSubmit = false,
}: {
	status: 'idle' | 'pending' | 'success' | 'error'
	autoFocus?: boolean
	autoSubmit?: boolean
}) {
	const [searchParams] = useSearchParams()
	const submit = useSubmit()
	const isSubmitting = useIsPending({
		formMethod: 'GET',
		formAction: '/users',
	})

	const handleFormChange = useDebounce((form: HTMLFormElement) => {
		submit(form)
	}, 400)

	return (
		<Form
			method="GET"
			action="/users"
			className="flex items-center justify-center gap-2"
			onChange={e => autoSubmit && handleFormChange(e.currentTarget)}
		>
			<div className="flex-1">
				<Label htmlFor="search" className="sr-only">
					Search
				</Label>
				<Input
					type="search"
					name="search"
					id="search"
					defaultValue={searchParams.get('search') ?? ''}
					placeholder="Search for datasets"
					className="w-full"
					autoFocus={autoFocus}
				/>
			</div>
			<div className="bg-black text-black">
				<StatusButton
					type="submit"
					status={isSubmitting ? 'pending' : status}
					className="items-center justify-center text-black bg-black"
					size="sm"
				>
					<Icon name="magnifying-glass" className="text-black bg-black" size="sm" />
					<span className="sr-only">Search</span>
				</StatusButton>
			</div>
		</Form>
	)
}

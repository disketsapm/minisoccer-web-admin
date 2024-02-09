import { toast } from '@/components/ui/use-toast';
import { LoginRequestBody } from '@/interfaces/auth.interface';
import { AuthService } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useLogin() {
    const authService = new AuthService();
    const router = useRouter();

    return useMutation({
        mutationFn: (data: LoginRequestBody) => authService.login(data),
        onSuccess: () => router.push('/dashboard'),
        onError: (error) => {
            toast({
                title: 'Login failed',
                description: error.message,
                variant: 'destructive',
                duration: 5000,
            });
        },
    });
}

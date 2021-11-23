#include <bits/stdc++.h>
#define maxn 1003
#define maxc 1000000003

using namespace std;

int n, a[maxn];

int main()
{
    freopen("inp.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    cin >> n;
    for(int i=1; i<=n; i++)
        cin >> a[i];
    sort(a+1, a+n+1);
    for(int i=1; i<=n; i++)
        for(int j=i+1; j<=n; j++)
            for(int k=j+1; k<=n; k++)
                if(a[i] * a[i] + a[j] * a[j] == a[k] * a[k])
                {
                    cout << "YES";
                    return 0;
                }
    cout << "NO";
}
